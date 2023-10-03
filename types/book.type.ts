export type Book = {
    title: string;
    slug: string;
    author: string;
    ratings: {
        count: number;
        avg: number;
    };
};
