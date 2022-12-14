import * as _ from 'lodash';
function Tree({imagesCategory, path, changeList, isActiveList, changeRoot,  isActiveRoot, onClickCard}) {

  let entireObj=Object.entries(imagesCategory);

  const categoryes = []; 
  const thumbnailImages = [];

  for (const [key, value] of entireObj) {
    categoryes.push(key);
    value.map((obj)=>thumbnailImages.push(obj));
  }
    return (
      <div>
        <ul>
          <li key={path} onClick={changeRoot}>Root
            <ul> {categoryes.map((obj)=>
            <li key={obj.value} categid={obj} className={isActiveRoot?null:'hidden'} onClick={changeList}>{obj}
              <ul>{thumbnailImages.map((obj1,index)=>
                obj1.category==obj?<li key={obj1.filesize.value} cardid={obj1.category} className={isActiveList?'hidden':'list__style'}><img className='thumbnail' src={path+obj1.image} onClick={onClickCard} data-obj-id={index}></img></li>:null)}
              </ul>
            </li>)}
            </ul>
          </li> 
        </ul>
      </div>
    );
  }

  export default Tree;