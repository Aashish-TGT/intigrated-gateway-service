export interface Template {
    id: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    font: string;
    textAlignment: 'left' | 'center' | 'right';
    legalNotes: string;
    footer: string;
    offers: string;
}

export interface Brand {
    id: string;
    name: string;
    assignedTemplateId?: string;
}