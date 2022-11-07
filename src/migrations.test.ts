import { migrateQuery } from './migrations'

describe('Migrations', () => {
    it('should migrate single string queries', () => {
        let query = {
            target: "single_string"
        };

        migrateQuery(query);

        expect(query).toStrictEqual({
            target: ["single_string"]
        })
    });

    it('should migrate legacy annotation queries', () => {
        let query = {
            query: "*, annotation1 ,annotation2"
        };

        migrateQuery(query);

        expect(query).toStrictEqual({
            target: ["annotation1", "annotation2"]
        })

    });
});
