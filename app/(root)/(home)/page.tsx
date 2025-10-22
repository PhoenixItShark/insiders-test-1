'use client'
import { Home } from '@/components'
import style from '@/style/Home/home.module.scss'

const page = () => {
  return (
    <section className={style.home}>
      <Home />
    </section>
  )
}

export default page