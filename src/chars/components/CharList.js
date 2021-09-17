import React from 'react';
import CharItem from './CharItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './CharList.css';

const CharList = props =>{  

    
     
        const createChars = (data, index) =>{
          return(
            
                <CharItem 
                    key={index}
                    id={data.id}
                    charName={data.name}
                    charClass={data.charClass}
                    spec={data.spec}
                    title={data.title}
                    mProf={data.firstProfession}
                    sProf={data.secondProfession}
                    content={data.content}
                    onDelete={props.onDeleteChar}

                />
            )
        }
    
        return (
          <React.Fragment>
{props.items.length === 0 && <div className="char-list">
            <Card>
              <h2>No chars found. Maybe create one?</h2>
              <Button to="/chars/new">Create Char</Button>
            </Card>
          </div>}

            <div className="char-list-container">
      <ul className="char-list">
      {props.items.map(createChars)}
      </ul>
        </div>


          </React.Fragment>


)
    

    
    

}

export default CharList;