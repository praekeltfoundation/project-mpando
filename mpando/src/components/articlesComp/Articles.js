import React,{ Component, Fragment } from 'react';
import $ from "jquery";
import './assets/Articles.css';

import json from '../../data/articles.json';


class Aricles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data: json
    })
    console.log('componentDidMount');
  }

  render() {
    const { data } = this.state;
    return (
      <div className="Articles">
        {data.map((item, index) =>
          <Fragment>
            <div className="Articles-media" key={item.media.iframe.title}>
              <div className="Articles-media__source">
                <iframe
                  title={item.media.iframe.title}
                  width={item.media.iframe.width}
                  height={item.media.iframe.height}
                  src={item.media.iframe.src}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
              </div>
            </div>

            <div className="Articles-info">
              <div className="Articles-info-wrapper">
                <h3 className="Articles-info__title">{item.info.title}</h3>
              </div>
              <div className="Articles__list">
                {item.info.articleItems.map((post,i) =>
                  <div className="Articles__item" key={i}>
                    <div className="Articles__image">
                      <img className="Articles__thumbnail"
                        alt={post.image.alt}
                        src={post.image.src}/>
                    </div>
                    <div className="Articles__excerpt">
                      <div className="Articles__heading">
                        <h4 className="Articles__title">{post.title}</h4>
                      </div>
                      <div className="Articles__text">
                        <p>{post.description}</p>
                      </div>
                    </div>
                </div>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}



export default Aricles;
