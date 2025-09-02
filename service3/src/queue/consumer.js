import { ServiceBusClient } from '@azure/service-bus';
import { config } from '../config.js';
import { GenerateRequestSchema } from '../utils/validation.js';
import { sanitizeTransaction } from '../utils/sanitize.js';
import { getTemplatePath } from '../services/templateRegistry.js';
import { renderReceiptHTML, htmlToPdf } from '../services/pdfService.js';
import path from 'path';

export async function startConsumer() {
  if (!config.asb.connectionString || !config.asb.queueName) {
    console.warn('[service-bus] Skipping consumer (no ASB config provided)');
    return;
  }

  const sbClient = new ServiceBusClient(config.asb.connectionString);
  const receiver = sbClient.createReceiver(config.asb.queueName);

  receiver.subscribe({
    processMessage: async (msg) => {
      try {
        // Expect body to match GenerateRequestSchema or a compatible event payload
        const body = typeof msg.body === 'string' ? JSON.parse(msg.body) : msg.body;
        const { transaction, template = { name: 'default', version: 'v1' }, locale = 'en-IN' } =
          GenerateRequestSchema.partial().parse(body);

        const tx = sanitizeTransaction(transaction);
        const templatePath = getTemplatePath(template.name, template.version);
        const html = await renderReceiptHTML(templatePath, { tx, locale });
        const outPath = path.join(config.paths.receiptsDir, `${tx.transactionId}.pdf`);
        await htmlToPdf(html, outPath);

        console.log(`[service-bus] Generated receipt for ${tx.transactionId}`);
      } catch (err) {
        console.error('[service-bus] message processing error', err);
        // Dead-letter on failure
        await receiver.deadLetterMessage(msg, { deadLetterReason: 'ProcessingError', deadLetterErrorDescription: String(err) });
        return;
      }
      await receiver.completeMessage(msg);
    },
    processError: async (args) => {
      console.error('[service-bus] subscription error', args.error);
    }
  });

  console.log('[service-bus] consumer started on queue:', config.asb.queueName);
}
