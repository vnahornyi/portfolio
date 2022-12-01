import { groq } from 'next-sanity';
import { IResume } from 'types';
import client from './client';

async function getResume(): Promise<IResume> {
    const data: IResume = await client.fetch(
        groq`*[_type == 'resume' && selected == true][0]{
            "pdfUrl": manuscript.asset->url,
            "image": {
                "src": image.asset->url,
                "width": image.asset->metadata.dimensions.width,
                "height": image.asset->metadata.dimensions.height,
                "placeholder": image.asset->metadata.lqip
            }
        }`
    );

    return data;
}

export default getResume;
