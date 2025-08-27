import React, { Component } from 'react'

export class NewsItem extends Component {
   render() {
      let {title, discription, imgUrl, newsUrl,author,date,name} = this.props;
      return (
         <div>
            <div className="card" >
               <img src= {!imgUrl? "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/04/siri-ios19-white.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1":imgUrl} className="card-img-top" alt="..."/>
                  <div className="card-body">
                     <h5 className="card-title">{title}</h5>
                     <span className="badge text-bg-danger">{name}</span>
                     <p className="card-text">{discription}</p>
                     <p className="card-text"><small class="text-body-secondary">By: {!author? "Unknown":author} on {new Date(date).toGMTString()}</small></p>
                     <a href={newsUrl} target="_blank" rel="noreferrer noopener" className="btn btn-primary">Read More</a>
                  </div>
            </div>
         </div>
      )
   }
}

export default NewsItem
