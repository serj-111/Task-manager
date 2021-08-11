import React from "react";
import s from "./Welcome.module.css";
import {Menu} from "./Menu";
import sample from "./1.mp4"

export class Welcome extends React.Component {
    render() {
        return (
            // <div>
            //     <Menu />
            //         <div>
            //             <div className={s.fullscreen}>
            //                 <div className={s.body}>
            //                     <div className={s.title}>Добро пожаловать</div>
            //                 </div>
            //                 <video autoPlay muted loop className={s.video}>
            //                     <source type="video/mp4" src={sample}/>
            //                 </video>
            //             </div>
            //         </div>
            // </div>

            <div>
                <Menu />
                <div className={s.outer}>
                    <div className={s.title}>Добро пожаловать</div>
                    <video autoPlay muted loop className={s.video}>
                        <source type="video/mp4" src={sample}/>
                    </video>
                </div>

            </div>
        );
    }
}