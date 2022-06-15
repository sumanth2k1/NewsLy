import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 16,
        category: 'general',
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log('Hello i am a constructor from news components');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4f404efc6e844bc39baa599fe6b50020&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })
    }

    async componentDidMount() {
        
        this.updateNews();

    }

    handlePrevClick = async () => {
      
        this.setState({page: this.state.page - 1});
        this.updateNews();

    }

    handleNextClick = async () => {
        
        this.setState({page: this.state.page + 1});
        this.updateNews();
    
    }

    render() {
        return (
            <div className="container my-5">
                <h1 className=" text-center">Newsly - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="container mb-2 d-flex justify-content-end">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark ms-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark ms-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 80) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"(unknown)":element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}


                </div>
                <div className="container  d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
