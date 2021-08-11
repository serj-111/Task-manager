import {host} from "../config";
import {Menu} from "./Menu";
import React from "react";
import s from "./Welcome.module.css";
import sample from "./1.mp4";

export class Exit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: "",
            body: ""
        }
    }

    componentDidMount() {
        fetch(host + "/destroySession",{
            credentials: 'include'
        })
            .then(response=>response.json())
            .then(result=>{
                if(result.result === "success"){
                    this.setState({
                        menu: <Menu/>,
                        body:
                        //     <div>
                        //     <div className={s.fullscreen}>
                        //         <div className={s.body}>
                        //             <div className={s.title}>Возвращайтесь</div>
                        //         </div>
                        //         <video autoPlay muted loop className={s.video}>
                        //             <source type="video/mp4" src={sample}/>
                        //         </video>
                        //     </div>
                        // </div>
                            <div className={s.outer}>
                                <div className={s.title}>Возвращайтесь</div>
                                <video autoPlay muted loop className={s.video}>
                                    <source type="video/mp4" src={sample}/>
                                </video>
                            </div>
                    })
                }
            })
    }

    render() {
        return ( <div>
                {this.state.menu}
                {this.state.body}
                </div>
        );
    }
}
