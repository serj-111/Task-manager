import React from "react";
import {host} from "../config";
import {Task} from "./Dashboard/Dashboard";

function Block(props) {
    return (
        <div className="w-100 h-50 border rounded shadow-sm pb-3 mb-3 bg-white rounded">
            <h4 className="mb-3 py-3 rounded shadow-sm">{props.name}</h4>
            <div className="h-75 mx-3">
                <Task {...props}/>
            </div>
        </div>
    );
}

export class CabinetTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }

    componentDidMount() {
        fetch(host + "/getStatus")
            .then(response => response.json())
            .then(result => {
                this.setState({
                    blocks: result.filter(item => {
                        if (item.value === "todo" || item.value === "done") {
                            return true;
                        }
                    }).map(section => {
                        return (
                            <Block
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
        return (
            <div className="container m-0 d-flex flex-wrap text-center p-3 h-100 overflow-hidden">
                {this.state.blocks}
            </div>
        );
    }
}