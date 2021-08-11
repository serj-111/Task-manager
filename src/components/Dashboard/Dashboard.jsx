import React from "react";
import {host} from "../../config";
import {Menu} from "../Menu";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {DndProvider} from "react-dnd";
import board from "./Dashboard.module.css"





export const ResultContext = React.createContext([]);




export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: []
        }
    }

    componentDidMount() {
        fetch(host + "/getStatus")
            .then(response => response.json())
            .then(result => {
                ResultContext.Provider = result;
                this.setState({
                    sections: result.map(section => {
                        return (
                            <DashboardSection
                                key={section.id}
                                id={section.id}
                                value={section.value}
                                name={section.name}
                            />
                        );
                    })
                })

            })
    }


    render() {
        return (<div>
                <Menu/>
                    <div className="container d-flex flex-wrap p-0"
                         style={{height: "75vh"}}>
                        {this.state.sections}
                    </div>
                </div>

        );
    }
}

export class DashboardSection extends React.Component {

    constructor(props) {
        super(props);
        this.dragOverHandler = this.dragOverHandler.bind(this)
        this.dropHandler = this.dropHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);

        this.state = {
            resultChangeStatus: "",
            sections: []

        }
    }

    dragOverHandler(e){
        e.preventDefault()
        e.currentTarget.style.boxShadow = "0 0 6px gray";
    }

    dragLeaveHandler(e) {
        e.preventDefault()
        e.currentTarget.style.boxShadow = "none"

    }


    dropHandler(e) {

        e.preventDefault();
        let task = e.target.ownerDocument.activeElement.getAttribute("href");
        task = task.split("/")[3];

        const formData = new FormData();
        formData.append("statusId", this.props.id);
        formData.append("id", task);
        fetch(host+"/changeStatus", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                if (result.result === "success") {
                    this.setState({
                        resultChangeStatus: "success"

                    })
                }

            })
    }


    render() {
        if (this.state.resultChangeStatus === "success") {
            return window.location.reload()
        }
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 p-2 text-center h-100"
                 onDragLeave={this.dragLeaveHandler}
                 onDragOver={this.dragOverHandler}
                 onDrop={this.dropHandler}>

                <div className="border rounded h-100 overflow-hidden shadow-sm bg-white pb-5" >
                    <h4 className="mb-3 py-3 rounded shadow-sm">{this.props.name}</h4>
                    <div className="mx-3 overflow-auto" style={{height: "94%"}} >
                        <Task {...this.props}/>
                    </div>
                </div>
            </div>

        );
    }
}


export class OneTask extends React.Component {
    constructor(props) {
        super(props);
        this.submitRemove = this.submitRemove.bind(this);
        this.state = {
            resultRemove: "",

        }
    }

    submitRemove(event) {
        event.preventDefault();
        const formData = new FormData;
        formData.append("id", this.props.id);
        fetch(host+"/removeTask", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                if (result.result === "success") {
                    this.setState({
                        resultRemove: "success"
                    })
                }
            })
    }




    render() {
        if (this.state.resultRemove === "success") {
            return <Redirect to="/dashboard"/>;
        }
        return (
                <div className={board.hover}>
                    <Link className="card text-dark mb-3"
                          style={{height: "100px", background: "linear-gradient(135deg,#f0f3f0,#beb6a0)", }}
                          to={`/dashboard/task/${this.props.id}`}
                          draggable={true}
                    >
                        <div className="d-flex flex-row-reverse p-2">
                            <button onClick={this.submitRemove} className="btn-close btn-close-white" title="Удалить задачу"/>
                        </div>
                        <h6 className="card-title position-absolute top-50 start-50 translate-middle m-0" >{this.props.title}</h6>
                    </Link>
                </div>


        );
    }
}


export class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        const formData = new FormData;
        formData.append("id", this.props.id);
        fetch(host+"/getOneStatus", {
            credentials: 'include',
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                this.setState({
                    tasks: result.map(ot => {
                        const parser = new DOMParser();
                        const html = parser.parseFromString(ot.title, "text/html");
                        return (
                            <OneTask
                                key={ot.id}
                                id={ot.id}
                                title={html.body.innerText.slice(0, 20)}
                                text={ot.text}
                                date_added={ot.date_added}
                            />
                        );
                    })
                })
            })

    }




    render() {

        return (

            <div className="h-100 overflow-auto">
                <h6 >{this.state.tasks}</h6>
            </div>
        );
    }
}