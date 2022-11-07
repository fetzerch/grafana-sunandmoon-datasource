// Migrate old single string and annotation queries
export const migrateQuery = (query: any) => {
    if (query.query) {
        let targets: string[] = query.query.split(",").map((target: string) => target.trim());
        query.target = targets.filter(target => target !== "*");
        delete query.query;
    } else if (typeof query.target === "string") {
        query.target = [query.target];
    }
}
