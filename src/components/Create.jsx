import React from "react";
import s from "./Dashboard/Task.module.css";
import {Link} from "react-router-dom";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import {host} from "../config";



export class Create extends React.Component {

    constructor(props) {
        super(props);
        this.sunEditorRef = React.createRef();
        this.state = {
            title: "",
            text: "",
            date_added: "",
            result: ""
        }
        this.handlerInput = this.handlerInput.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handlerSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("text", this.state.text);
        fetch(host + "/createTask", {
            credentials: 'include',
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                if (result.result === "success") {
                    this.setState({
                        result: "success"
                    })
                }
            });
    }



    render() {
        if (this.state.result === "success") {
            return window.location.reload()
        }
        return (
            <div>
                <div className="container">
                    <div className={s.modal}>
                        <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header row">
                                    <div className="d-flex p-2 px-4">
                                        <div className="d-flex mb-3 flex-fill">
                                            <h5 className="modal-title" id="staticBackdropLabel">Создание задачи</h5>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <Link to="/dashboard" className="btn-close"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body p-5">
                                    <form onSubmit={this.handlerSubmit}>
                                        <div className="mb-3">
                                            <input value={this.state.title} onChange={this.handlerInput} name="title"
                                                   type="text" placeholder="Заголовок" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <SunEditor
                                                ref={this.sunEditorRef}
                                                name="text"
                                                onChange={(value) => {
                                                    const name = (this.sunEditorRef.current.props.name);
                                                    this.setState({
                                                        [name]: value
                                                    })
                                                }}
                                                height="250px"/>
                                        </div>
                                        <input disabled={!this.state.title} type="submit"
                                               className="btn btn-outline-success bg-gradient" value="Сохранить"/>
                                    </form>
                                </div>
                                <div className="modal-footer pe-4" style={{backgroundColor: "#f0f3f0"}}>
                                    <p/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}