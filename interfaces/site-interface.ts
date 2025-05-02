export interface ISite {
    id: number
    sejarah?: string | null;
    visiMisi?: string | null;
    tugasDanFungsi?: string | null;
    strukturOrganisasi?: string | null;
    createdAt: Date,
    updatedAt: Date
}