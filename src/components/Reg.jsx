import React from 'react';
import {Redirect} from "react-router-dom";
import {host} from "../config";
import {Menu} from "./Menu";



export class Reg extends React.Component{
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.state = {
            name:"",
            lastname:"",
            email:"",
            pass:"",
            info:"",
            redirect: false
        }
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
        formData.append("name",this.state.name);
        formData.append("lastname",this.state.lastname);
        formData.append("email",this.state.email);
        formData.append("pass",this.state.pass);
        fetch(host + "/handlerReg",{
            method: "POST",
            body: formData
        })
            .then(response=>response.json())
            .then(result=>{
                if(result.result === "exist"){
                    this.setState({
                        info: "Такая почта существует!"
                    })
                }else{
                    this.setState({
                        redirect: true
                    })
                }
            });
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/auth" />
        else
        return <div>
            <Menu/>
            <div className="col-sm-5 mx-auto border rounded overflow-hidden shadow-sm p-3 mb-5 bg-white rounded position-absolute top-50 start-50 translate-middle">
                <form onSubmit={this.handleSubmit}>
                    <p className="fs-1 text-center">Регистрация</p>
                    <div className="mb-3">
                        <input value={this.state.name} onChange={this.handleInput} name="name" type="text" className="form-control" placeholder="Имя"/>
                    </div>
                    <div className="mb-3">
                        <input value={this.state.lastname} onChange={this.handleInput} name="lastname" type="text" className="form-control" placeholder="Фамилия" />
                    </div>
                    <div className="mb-3">
                        <input value={this.state.email} onChange={this.handleInput} name="email" type="email" className="form-control" placeholder="Email"/>
                        <p style={{color:"red"}}>{this.state.info}</p>
                    </div>
                    <div className="mb-3">
                        <input value={this.state.pass} onChange={this.handleInput} name="pass" type="password" className="form-control" placeholder="Пароль"/>
                    </div>
                    <div className="mb-3">
                        <input type="submit" disabled={!this.state.lastname || !this.state.name || !this.state.email || !this.state.pass} className="form-control btn btn-dark bg-gradient" value="Регистрация"/>
                    </div>
                </form>
            </div>
        </div>

    }
}