import xpath from 'xpath'


export const SET_DISPLAY_TYPE = 'SET_DISPLAY_TYPE'
export const DisplayType = {
  SHOW_MAP: 'SHOW_MAP',
  SHOW_SEARCH: 'SHOW_SEARCH',
  SHOW_LIST: 'SHOW_LIST',
  REQUEST: 'REQUEST',
  DETAILS: 'DETAILS'
}

export const TO_FAVORITES = 'TO_FAVORITES'
export function toFavorites(_array) {
  return {
    type: TO_FAVORITES,
    favorites: _array
  }
}

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export function addToFavorites(id, address) {
  console.log("ADD_TO_FAVORITES")
  return {
    type: ADD_TO_FAVORITES,
    id: id,
    address: address
  }
}


export const COME_BACK = "COME_BACK"
export function comeBack() {
  return { type: COME_BACK }
}


export const SWIPE_LEFT = 'SWIPE_LEFT'
export function swipeLeft(displayType) {
  return {
    type: SWIPE_LEFT,
    currDisplayType: displayType
  }
}


export const SWIPE_RIGHT = 'SWIPE_RIGHT'
export function swipeRight(displayType) {
  return {
    type: SWIPE_RIGHT,
    currDisplayType: displayType
  }
}


export const SET_SEARCH_STATE = 'SET_SEARCH_STATE' 
export function setSearchState(searchState) {
  return { 
    type: SET_SEARCH_STATE,
    searchState: searchState
  }
}



export const REQUEST_DETAILS = "REQUEST_DETAILS" 
function requestDetails() {
  return { type: REQUEST }
}


export const RECEIVE_DETAILS = "RECEIVE_DETAILS"
function receiveDetails(id, text) {
  console.log("id", id);
  console.log(text.toString().slice(0,2000))
  String.prototype.deentitize = function() {
      var ret = this.replace(/&gt;/g, '>');
      ret = ret.replace(/&lt;/g, '<');
      ret = ret.replace(/&quot;/g, '"');
      ret = ret.replace(/&apos;/g, "'");
      ret = ret.replace(/&nbsp;/g, ' ');
      ret = ret.replace(/&.*?;/g, '');
      ret = ret.replace(/\s\d+?="/g, 'n="');
      ret = ret.replace(/@click/g, 'click');
      ret = ret.replace(/:([\w-]*?)(=.*)/g, "$1$2");
      return ret;
  };
  var DomParser = require('xmldom').DOMParser

  try {
    doc = new DomParser().parseFromString(text.deentitize())

    description = xpath.select("//div[@class='apartment-info__sub-line apartment-info__sub-line_extended-bottom']//text()", doc).toString().trim()

    address = xpath.select("//div[@class='apartment-info__sub-line apartment-info__sub-line_large']//text()", doc).toString().trim()

    price = xpath.select("//span[@class='apartment-bar__price-value apartment-bar__price-value_complementary']//text()", doc).toString().trim()

    phone =  xpath.select("//a[contains(@href, 'tel')]//text()", doc).toString().trim()

    bulletsWith = xpath.select('//div[@class = "apartment-options"]/div[not(contains(@class, "apartment-options__item_lack"))]', doc).map( i => i.firstChild.data )

    bulletsWithout = xpath.select('//div[@class = "apartment-options"]/div[contains(@class, "apartment-options__item_lack")]', doc).map( i => i.firstChild.data )

    images = xpath.select('//div[@class="apartment-cover__thumbnails-inner"]/div[contains(@style, "background-image:")]/@style', doc).map( i => i.toString().match(/url\((.+)\)/i)[1])

    latitude = text.match(/var latitude = ([\d.]+)/i)[1]
    longitude = text.match(/longitude = ([\d.]+)/i)[1]

    console.log(description, phone, bulletsWith, bulletsWithout)

    details = {
      id: id,
      address: address,
      price: price,
      actual: true,
      images: images,
      description: description,
      phone: phone,
      bulletsWith: bulletsWith,
      bulletsWithout: bulletsWithout,
      coordinate: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    }
      
    return {
      type: RECEIVE_DETAILS,
      id: id,
      details: details,
      receivedAt: Date.now()
    }
  } catch (e) {
  }
}

export function fetchDetails(id) {
  return function (dispatch) {
    dispatch(requestDetails());
    url = "https://r.onliner.by/ak/apartments/" + id
    console.log(url);
    
    return fetch(url, {
      method: 'GET'
    })
      .then( response => response.text())
      .then( text => {dispatch(receiveDetails(id, text))} )
      .catch(function(err) {
            console.log('Fetch Error :-S', err);
      });
  }
}

export const REQUEST = "REQUEST" 
function requestData(url) {
  return {
    type: REQUEST,
    url
  }
}

export const RECEIVE_POINTS = "RECEIVE_POINTS"
function receivePoints(url, json) {
  return {
    type: RECEIVE_POINTS,
    url: url,
    json: json,
    receivedAt: Date.now()
  }
}

export function fetchPoints(url) {
  return function (dispatch) {
    dispatch(requestData(url));

    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'Accept: application/json, text/plain, */*'
      }
    })
      .then( response => response.json())
      .then( json => dispatch(receivePoints(url, json)) )
  }
}


export const RECEIVE = "RECEIVE"
function receiveData(url, json) {
  return {
    type: RECEIVE,
    url: url,
    json: json,
    receivedAt: Date.now()
  }
}

export function fetchData(url) {
  return function (dispatch) {
    dispatch(requestData(url));

    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'Accept: application/json, text/plain, */*'
      }
    })
      .then( response => response.json())
      .then( json => dispatch(receiveData(url, json)) )
  }
}

