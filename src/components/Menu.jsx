import React from "react";
import {NavLink} from "react-router-dom";
import {host} from "../config";



export class Menu extends React.Component {

    handleUpdate = () => {
        this.forceUpdate();
    };

    constructor(props) {
        super(props);
        this.state = {
            create: "",
            cabinet: "",
            reg: "",
            auth: "",
            startpage: "",
            exit: ""
        }
    }

    componentDidMount() {
        fetch(host + "/checkSession",{
            credentials: 'include'
        })
            .then(response=>response.json())
            .then(result=>{
                if(result.result !== "error"){
                    this.setState({
                        create: <NavLink className="btn btn-outline-success bg-gradient text-nowrap" to="/dashboard/create" type="submit" onClick={this.handleUpdate}>Создать задачу</NavLink>,
                        cabinet: <NavLink className="btn btn-outline-success bg-gradient text-nowrap" to="/cabinet" type="submit" onClick={this.handleUpdate}>Личный кабинет</NavLink>,
                        exit:    <NavLink type="submit" className="btn btn-outline-dark bg-gradient" to="/exit" onClick={this.handleUpdate}>Выход</NavLink>,
                        startpage: "dashboard"
                    })
                }else if(result.result === "error"){
                    this.setState({
                        reg: <NavLink className="btn btn-outline-dark bg-gradient" to="/reg" type="submit" onClick={this.handleUpdate}>Регистрация</NavLink>,
                        auth: <NavLink className="btn btn-outline-dark bg-gradient" to="/auth" type="submit" onClick={this.handleUpdate}>Войти</NavLink>,
                        startpage: "/"
                    })
                }
            })

    }

    render() {
        return (
            <div className="mb-5">
                <nav className="navbar navbar-expand-md navbar-light bg-light rounded-bottom shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="container">
                        <NavLink className="navbar-brand me-3 mb-2" to={this.state.startpage}><h1>tsk_mngr</h1></NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <div className="d-grid gap-2 d-md-flex">
                                {this.state.create}
                            </div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"/>
                            <div className="d-grid gap-2 d-md-flex" onClick={this.handleUpdate} >
                                {this.state.reg}
                                {this.state.auth}
                                {this.state.cabinet}
                                {this.state.exit}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}