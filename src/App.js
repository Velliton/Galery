import axios from "axios";
import React, {
  useEffect,
  useState,
  useCallback
} from "react";
import Card from "./components/card/Card";
import dayjs from "dayjs";
import * as _ from 'lodash';
import Tree from "./components/tree/Tree";
import Popup from "./components/popup/Popup";
import Loader from "./components/loader/Loader";
import ReactPaginate from 'react-paginate';



const readLocalStorageData = () => {
  const deletedImagesStorage = localStorage.getItem('deletedImages') ? JSON.parse(localStorage.getItem('deletedImages')) : [];
  return deletedImagesStorage;
};


const apiUrl = 'http://contest.elecard.ru/frontend_data/';  


function App() {
  const [images, setImages] = useState([]);
  const [imagesCategory, setImagesCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState('name');
  const [viewType, setViewType] = useState('card');
  const [modalActive, setModalActive]=useState(false);
  const [isActiveList,setIsActiveList]=useState(false);
  const [isActiveRoot,setIsActiveRoot]=useState(false);
  const [imageActive, setImageActiv]=useState();



  const [currentImg, setcurrentImg] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const imgPerPage=100;

  



useEffect(()=>{
  const endOffset = itemOffset+imgPerPage;
  setcurrentImg(images.slice(itemOffset,endOffset));
  setPageCount(Math.ceil(images.length/imgPerPage));
},[itemOffset, imgPerPage, images])

const handlePageClick=(event)=>{
  const newOffset=(event.selected*imgPerPage)%images.length;
  setItemOffset(newOffset);
}


  useEffect(() => {

    


    const deletedImages = readLocalStorageData();
    const getItems = async () => {
      setIsLoading(true);
      const res = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json');
      const resData = res.data;
      const filteredData = _.filter(resData, (item) => !_.includes(deletedImages, item.image));
      const groupedImages = _.groupBy(filteredData, 'category');
      setImages(filteredData);
      setImagesCategory(groupedImages);
      setIsLoading(false);
    }
    getItems();    
  }, [])

  const onRemoveItem = (image) => {
    setImages((prev) => prev.filter(obj => obj.image !== image));
    const deletedImagesStorage = readLocalStorageData();
    deletedImagesStorage.push(image)
    localStorage.setItem('deletedImages', JSON.stringify(deletedImagesStorage)); 
  }

  function clear() {
    setImages(images);
    localStorage.clear();
    window.location.reload();
  }

  function changeRoot(event){
    event.stopPropagation();
    setIsActiveRoot(!isActiveRoot);  
    setIsActiveList(true);  
  }

  function changeList(event){
    event.stopPropagation();
    setIsActiveRoot(true);
    setIsActiveList(!isActiveList);
    /* let undef=event.target; */
    
  }

  function changeSort(event) {
    setSortType(event.target.value);
      switch (event.target.value) {
        case 'no-sort':
          setImages(images)
        break;
        case 'name':
          const sortedByName = _.orderBy(images, ['image'], ['asc']);
          setImages(sortedByName)
        break;
        case 'size':
          const sortedBySize = _.orderBy(images, ['filesize'], ['asc']);
          setImages(sortedBySize)
        break;
        case 'date':
          const sortedByDate = _.orderBy(images, ['timestamp'], ['asc']);
          setImages(sortedByDate)
        break;
        case 'category':
          const sortedByCategory = _.orderBy(images, ['category'], ['asc']);
          setImages(sortedByCategory)
        break;
      }
  }

  function changeView(event) {
    setViewType(event.target.value);
  }


  if (isLoading) {
    return <Loader/>
  }
  
  const onCardClickHandler=(e)=>{
    const indexCard = e.currentTarget.getAttribute("data-obj-id");
    const inddd=e.currentTarget;
    setModalActive(true);
    setImageActiv(images[indexCard]);
    console.log(images[indexCard])
  }



  return (
    <div className="App">
      <header className="image__header">
       
      </header>
      <main className='image__main'>          
        <div className="image__view">
          <label className="image__label"><input className="image__input" type='radio' name="viewType" checked={viewType === 'card'} value="card" onChange={changeView}></input>Карточки</label>
          <label className="image__label"><input className="image__input" type='radio' name="viewType" checked={viewType === 'tree'} value="tree" onChange={changeView}></input>Древовидный список</label>
        </div>
        {viewType === 'card' ? <div className="image__clear btn third">
          <a onClick={clear}>сброс</a>
        </div>:null}
       
        {viewType === 'card' ?
        <div className="image__sort">
          <p className="image__sort-title">Сортировка:</p>
          <label className="image__label"><input className="image__input" type='radio' name="sortType" checked={sortType === 'no-sort'} value="no-sort" onChange={changeSort}></input>По умолчанию</label>
          <label className="image__label"><input className="image__input" type='radio' name="sortType" checked={sortType === 'name'} value="name" onChange={changeSort}></input>По названию</label>
          <label className="image__label"><input className="image__input" type='radio' name="sortType" checked={sortType === 'size'} value="size" onChange={changeSort}></input>По размеру</label>
          <label className="image__label"><input className="image__input" type='radio' name="sortType" checked={sortType === 'date'} value="date" onChange={changeSort}></input>По дате</label>
          <label className="image__label"><input className="image__input" type='radio' name="sortType" checked={sortType === 'category'} value="category" onChange={changeSort}></input>По категории</label>
        </div>
        :null}
        <div className="image__cards">
          {
            viewType === 'card' ? 
            currentImg.map((obj, index)=>
                <Card
                  key={obj.image}
                  items={imagesCategory}
                  loading={isLoading}
                  size={obj.filesize}
                  time={obj.timestamp}
                  category={obj.category}
                  path={apiUrl}
                  image={obj.image}
                  remove={onRemoveItem}
                />
              ) 
              : null
          }
          


        </div>
        {
            viewType === 'card' ? 
            <div className="pag"> 
              <ReactPaginate
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                activeClassName="active"
              />
          </div>
            :null
          }



    {
      viewType === 'tree' ?
        <div className="image__tree">
          <Tree
            onClickCard={onCardClickHandler}
            imagesCategory={imagesCategory}
            path={apiUrl}
            setIsActiveList={setIsActiveList}
            isActiveList={isActiveList}
            changeList={changeList}
            changeRoot={changeRoot}
            isActiveRoot={isActiveRoot}
            setIsActiveRoot={setIsActiveRoot}
          />
        </div> 
      : null
      
    }
    {
      viewType === 'tree' ?
      <Popup
      images={images}
      path={apiUrl}
      modalActive={modalActive}
      setModalActive={setModalActive}
      item={imageActive}
      />:null
    }
      </main>
      <footer className='image__footer'>
      </footer>      
    </div>
    );
}

export default App;
    