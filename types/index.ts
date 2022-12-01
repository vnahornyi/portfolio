export interface IPage {
    slug: string;
    title: string;
    body: IPortableElement[];
}

export interface IResume {
    pdfUrl: string;
    image: {
        src: string;
        width: number;
        height: number;
        placeholder: string;
    }
}

export interface IPortableElement {
    _key: string;
    _type: string;
    chidlren: IPortableElement[];
    markDefs: unknown[];
    style: string;
}

export interface IPost {
    body?: IPortableElement[];
    mainImage?: {
        src: string;
        width: number;
        height: number;
        placeholder: string;
    };
    categories: string[];
    created: string;
    description: string;
    id: string;
    modified: string;
    published: string;
    title: string;
    slug: string;
}
