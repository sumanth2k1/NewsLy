import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="m-2 shadow bg-body rounded">
                <div className="card">
                    <span className="position-absolute top-10 translate-middle badge rounded-pill bg-danger" style={{left: '50%', zIndex:'1'}}>{source}</span>
                    <img src={!imageUrl?"https://images.cnbctv18.com/wp-content/uploads/2021/04/IPO5-1019x573.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className=" btn btn-sm btn-dark mb-2">read more...</a>
                    <div className="card-footer bg-transparent border-success">
                    <p className="card-text"><small className="text-muted">-by ({ author}) on<span className="badge rounded-pill bg-secondary"> {new Date(date).toGMTString()}</span></small></p>
                    
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
