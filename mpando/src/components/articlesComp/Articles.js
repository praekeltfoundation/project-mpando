import React,{ Component, Fragment } from 'react';
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
    console.log('Stories: componentDidMount');
    this.setState({
      data: json
    })
  }

  render() {
    const { data } = this.state;
    return (
      <div className="Articles" key='a'>
        {data.map((item, index) =>
          <Fragment key='b'>
            <div className="Articles-media" key='c'>
              <div className="Articles-media__source" key='d'>
                <iframe
                  key={item.media.iframe.title}
                  title={item.media.iframe.title}
                  width={item.media.iframe.width}
                  height={item.media.iframe.height}
                  src={item.media.iframe.src}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
              </div>
            </div>

            <div className="Articles-info" key='e'>
              <div className="Articles-info-wrapper" key='f'>
                <h3 className="Articles-info__title" key={item.info.title}>{item.info.title}</h3>
              </div>
              <div className="Articles__list" key='g'>
                {item.info.articleItems.map((post,i) =>
                  <div className="Articles__item" key={i}>
                    <div className="Articles__image" key='h'>
                      <img className="Articles__thumbnail"
                        key={post.image.alt}
                        alt={post.image.alt}
                        src={post.image.src}/>
                    </div>
                    <div className="Articles__excerpt" key='i'>
                      <div className="Articles__heading" key='j'>
                        <h4 className="Articles__title" key={post.title}>{post.title}</h4>
                      </div>
                      <div className="Articles__text" key='k'>
                        <p key='l'>{post.description}</p>
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
