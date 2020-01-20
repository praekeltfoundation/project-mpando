import React from 'react';
import data from './articles.json';

import './assets/Articles.css';

function Aricles() {
  let articleMedia = data.articles.map((item, i, mediaArray)=> {
    if(item.media.iframe.type === true)
      return item.media.iframe;
    else return item.media.image;
  });

  let articles = data.articles.map((item, i, articlesArr)=> {
    return item.info;
  });

  return (
    <div className="Articles">
      {articleMedia.map(media =>
        <div className="Articles-media">
          <div className="Articles-media__source">
           <iframe
             title={media.title}
             width={media.width}
             height={media.height}
             src={media.src}
             frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
           </iframe>
          </div>
       </div>
      )}


      {articles.map(post =>
        <div className="Articles-info">
          <div className="Articles-info-wrapper">
            <h3 className="Articles-info__title">{post.title} </h3>
          </div>
          <div className="Articles__list">
            {post.articleItem.map(item =>
              <div className="Articles__item">
                <div className="Articles__image">
                  <img className="Articles__thumbnail"
                    alt={item.image.alt}
                    src={item.image.src}/>
                </div>
                <div className="Articles__excerpt">
                  <div className="Articles__heading">
                    <h4 className="Articles__title">{item.title}</h4>
                  </div>
                  <div className="Articles__text">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Aricles;
