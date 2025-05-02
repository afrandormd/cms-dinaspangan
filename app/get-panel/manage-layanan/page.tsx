import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getKategoriArtikel, getKategoriDokumen, getKategoriLayanan } from '@/services/master-data';
import KategoriLayanan from './kategori-layanan';
import { getLayananAduan } from '@/services/layanan';
import DataLayanan from './data-layanan';

export default async function MasteDataPage({
  searchParams
}: {
  searchParams: { page: string };
}) {
  
  const page = parseInt(searchParams.page) || 1;
  const limit = 20;
  const [kategoriLayanan,{tiket, total}] = await Promise.all([ getKategoriLayanan(), getLayananAduan(page, limit) ]);

  return (
    <div className='w-full flex mt-2'>
      <Tabs defaultValue="layanan" orientation='vertical' className='w-full'>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="layanan">Kategori Layanan</TabsTrigger>
            <TabsTrigger value="pengaduan">Data Pengaduan</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="layanan">
          {
            kategoriLayanan && <KategoriLayanan data={kategoriLayanan} />
          }
        </TabsContent>
        <TabsContent value="pengaduan">
        {
            tiket && <DataLayanan data={tiket} currentPage={page} kategori={[]} totalPages={total}/>
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}
