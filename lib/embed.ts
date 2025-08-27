// lib/embed.ts
import { pipeline } from "@xenova/transformers";
import { LRUCache } from "lru-cache";

type EmbeddingVector = number[];

const cache = new LRUCache<string, EmbeddingVector>({ max: 500 });

let embedder: any = null;

async function loadEmbedder() {
    if (!embedder) {
        embedder = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }
    return embedder;
}

export async function getEmbedding(text: string): Promise<EmbeddingVector> {
    if (cache.has(text)) return cache.get(text)!;

    const model = await loadEmbedder();
    const output = await model(text, {
        pooling: "mean",
        normalize: true,
    });

    const vector = Array.from(output.data as Iterable<number>);
    cache.set(text, vector);
    return vector;
}
