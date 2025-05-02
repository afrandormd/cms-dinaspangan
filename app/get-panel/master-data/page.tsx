import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getKategoriArtikel, getKategoriDokumen } from '@/services/master-data';
import KategoriArtikel from './kategori-artikel';
import KategoriDokumen from './kategori-dokumen';

export default async function MasteDataPage() {
  
  const kategoriArtikel = await getKategoriArtikel()
  const kategoriDokumen = await getKategoriDokumen()

  return (
    <div className='w-full flex mt-2'>
      <Tabs defaultValue="artikel" orientation='vertical' className='w-full'>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="artikel">Kategori Artikel</TabsTrigger>
            <TabsTrigger value="dokumen">Kategori Dokumen</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="artikel">
          {
            kategoriArtikel && <KategoriArtikel data={kategoriArtikel} />
          }
        </TabsContent>
        <TabsContent value="dokumen">
        {
            kategoriDokumen && <KategoriDokumen data={kategoriDokumen} />
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}
