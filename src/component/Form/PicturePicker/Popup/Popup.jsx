import React, { useState, useEffect } from 'react';

import formStyle from '../../Form.scss';
import style from '../Popup/Popup.scss';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      pictures: {}
    }
  }

  componentDidMount() {
    fetch('https://stolpodnos.ru/_constructor/btc.php')
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            pictures: res
          });
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
          this.setState({
            isLoaded: true,
            error: err
          });
        }
      )
  }

  render() {
    return (
      <div className={style.popup} >
        <div className={`${style.window} container`}>
          <div className={style.header}>
            <h2 className={formStyle.header}>Выберите рисунок</h2>
            <button className={style.close} onClick={() => this.props.setIsPopupOpen()}>× Закрыть</button>
          </div>
          <div className={style.content}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }

  renderContent() {
    if (this.state.error) {
      return (
        <>
          <h2>Ошибка, закройте окно и попробуйте еще раз</h2>
          <p>{this.state.error.message}</p>
        </>
      )
    } else if (!this.state.isLoaded || Object.keys(this.state.pictures).length === 0) {
      return <h2>Загрузка... (лучше какую-нибудь крутилку показать)</h2>
    } else {
      return this.renderCategories();
    }
  }

  renderCategories() {
    const result = [];
    for (const cat in this.state.pictures.categories) {
      result.push(
        <div className={style.category} key={cat}>
          <h3>{cat}</h3>
          <div className="row">
            {
              this.state.pictures.categories[cat].map(pic => {
                return (
                  <div className="col-md-3 col-sm-4 col-xs-6" key={pic.id}>
                    <img
                      onClick={() => {
                        this.props.changePicture(pic.url);
                        this.props.setIsPopupOpen();
                        this.props.changeNoPicture(false);
                      }}
                      className="img-responsive"
                      src={pic.preview_url}
                      alt={pic.name}
                    />
                    <p className={style.caption}>{pic.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
    return result;
  }
}
