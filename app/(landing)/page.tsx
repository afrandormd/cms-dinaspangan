import React, { Suspense } from 'react'
import ContentLanding from './content'
import { getSlider } from '@/services/site';
import { getArtikelForHome, getArtikelLast } from '@/actions/artikel.action';

const Home = async () => {

  const [dataSlider,dataArtikel,dataArtikelHome] = await Promise.all([
    getSlider(),
    getArtikelLast(),
    getArtikelForHome(),
  ]);
  return (
    <div>
      <Suspense>
        <ContentLanding slider={dataSlider} artikel={dataArtikel.data} artikelHome={dataArtikelHome.data} />
      </Suspense>
    </div>
  )
}

export default Home