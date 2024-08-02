import React from 'react'
import jordan1 from '../../images/imgsTH/acc5772e-7977-4eff-852c-f981edc77399_md.webp'
import ariforce1 from '../../images/imgsTH/979d9b33-2be5-4ea2-af93-fd0698a3770f_md.webp'
import dunk from '../../images/imgsTH/cc419239-548c-44fc-bfb5-97f3c675a0f4_md.webp'
import yeezy from '../../images/imgsTH/25378596-2bb5-4066-94f4-d74ee67c4450_md.webp'
import samba from '../../images/imgsTH/1511d8dc-0044-4bdd-9a63-5da341b91858_md.webp'
import asicsCourt from '../../images/imgsTH/e6968395-039e-48f2-92b0-6291394b3928_md.webp'
import './menuTH.scss'
export default function MenuTH() {
    return (
        <ul className='contain-th'>
            <li>
                <div><img src={jordan1} /> <span>Jordan 1</span></div>
            </li>
            <li>
                <div><img src={ariforce1} /> <span>Ariforce 1</span></div>
            </li>
            <li>
                <div><img src={dunk} /> <span>Dunk</span></div>
            </li>
            <li>
                <div><img src={yeezy} /> <span>Yeezy</span></div>
            </li>
            <li>
                <div><img src={samba} /> <span>Samba</span></div>
            </li>
            <li>
                <div><img src={asicsCourt} /> <span>Asics Court</span></div>
            </li>
        </ul>
    )
}
