import React, { Component } from 'react';
import NewsItem from './NewsItem';

import PropTypes from 'prop-types';


export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],   // Better: rename to 'articles'
      loading: false,
      page: 1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Live`
  }

  static defaultProps = {
    category: 'general',
  };
  11
  static propTypes = {
    category: PropTypes.string,
  };

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff38804f887a4d8c9eec5499c3b1a6e1&page=1&pageSize=${this.props.pageSize}`;

    // let url = `https://api.mediastack.com/v1/news?countries=in&category=${this.props.category}&access_key=8d7eb7f0fa04c259102f7e70b81a1751&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true })
    let data = await fetch(url); //fetch(url) makes a network request to the API, You can use await inside this function to pause until operations finish.
    let parsedData = await data.json();   //.jsno -> 	Parses the body into actual JavaScript data.
    console.log(parsedData); // Check this shows expected result
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    }); // ✅ FIXED
  }

  handlePrevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff38804f887a4d8c9eec5499c3b1a6e1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    // let url = `https://api.mediastack.com/v1/news?countries=in&category=${this.props.categories}&access_key=8d7eb7f0fa04c259102f7e70b81a1751&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true })
    let data = await fetch(url); //fetch(url) makes a network request to the API, You can use await inside this function to pause until operations finish.
    let parsedData = await data.json();   //.jsno -> 	Parses the body into actual JavaScript data.
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      article: parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff38804f887a4d8c9eec5499c3b1a6e1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

      //let url = `https://api.mediastack.com/v1/news?countries=in&category=${this.props.categories}&access_key=8d7eb7f0fa04c259102f7e70b81a1751&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true })
      let data = await fetch(url); //fetch(url) makes a network request to the API, You can use await inside this function to pause until operations finish.
      let parsedData = await data.json();   //.jsno -> 	Parses the body into actual JavaScript data.
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        article: parsedData.articles,
        loading: false
      })
    }
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className="container my-5">
        <div className="text-center">
          <h2 style={{ marginBottom: '30px' }}>News Live - Daily Free '{this.capitalizeFirstLetter(this.props.category)}' News</h2>
        </div>

        {this.state.loading &&
          <div className="text-center">
            <button class="btn btn-danger" type="button">
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          </div>
        }


        <div className="row">
          {this.state.article.length === 0 && <p>No news found.</p>}
          {!this.state.loading && this.state.article.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem       //import of news items..
                // title={element.title ? element.title.slice(0, 45) : ""}
                // discription={element.description ? element.description.slice(0, 70) : ""}
                title={element.title}
                discription={element.description}
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                name={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="container my-5 d-flex justify-content-around">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-danger" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;