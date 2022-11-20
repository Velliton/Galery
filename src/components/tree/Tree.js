import * as _ from 'lodash';
function Tree({imagesCategory, path, changeList, isActiveList, changeRoot,  isActiveRoot}) {

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
              <ul>{thumbnailImages.map((obj1)=>
                obj1.category==obj?<li key={obj1.filesize.value} cardid={obj1.category} className={isActiveList?'hidden':null}><img className='thumbnail' src={path+obj1.image}></img></li>:null)}
              </ul>
            </li>)}
            </ul>
          </li> 
        </ul>
      </div>
    );
  }

  export default Tree;