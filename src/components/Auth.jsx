import React from 'react';
import {Redirect} from "react-router";
import {host} from "../config";
import {Menu} from "./Menu";

export class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            info: "",
            result:""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",this.state.email);
        formData.append("pass",this.state.pass);
        fetch(host+"/handlerAuth",{
            credentials: 'include',
            method: "POST",
            body: formData
        })
            .then(response=>response.json())
            .then(result=>{
                if(result.result === "success"){
                    this.setState({
                        result: "success"
                    })

                }else{
                    this.setState({
                        info: "Неверно введен логин или пароль"
                    })
                }
            });
    }
    render() {
        if (this.state.result === "success") {
            return <Redirect to="/dashboard"/>;
        }
        return (
                <div>
                    <Menu/>
                    <div className="col-sm-5 mx-auto border rounded overflow-hidden shadow-sm p-3 mb-5 bg-white rounded position-absolute top-50 start-50 translate-middle">
                        <form onSubmit={this.handleSubmit}>
                            <p className="fs-1 text-center">Авторизация</p>
                            <div className="mb-3">
                                <input value={this.state.email} onChange={this.handleInput} name="email" type="text" className="form-control" placeholder="Логин"/>
                                <p style={{color:"red"}}>{this.state.info}</p>
                            </div>
                            <div className="mb-3">
                                <input value={this.state.pass} onChange={this.handleInput} name="pass" type="password" className="form-control" placeholder="Пароль"/>
                            </div>
                            <div className="mb-3">
                                <input type="submit" value="Войти" className="form-control btn btn-dark bg-gradient"/>
                            </div>
                        </form>
                    </div>
                </div>

        )
    }
}
