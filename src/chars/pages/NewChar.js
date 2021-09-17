import React ,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';
import './NewChar.css';
import Card from '../../shared/components/UIElements/Card';
import classes from '../../assets/data-assets/classes';
import professions from '../../assets/data-assets/professions';

const [ Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock, Warrior ] = classes;

const NewChar = () => {
    const auth = useContext(AuthContext);
    const {isLoading, sendRequest,error,clearError} = useHttpClient();
    const [formState, inputHandler ] = useForm(
        {
            name:{
                value: "",
                isValid:false
            },
            charClass:{
                value:"",
                isValid:false
            },
            spec:{
                value:"",
                isValid:false
            },
            firstProfession:{
                value:"",
                isValid:false
            },
            secondProfession:{
                value:"",
                isValid:false
            }
        },false
    );
    const history = useHistory();

    let specOptions;
    specOptions = [];
    if (formState.inputs.charClass.value === "Druid") {
       specOptions = Druid.specs;
    }
    if (formState.inputs.charClass.value === "Hunter") {
        specOptions = Hunter.specs;
     }
     if (formState.inputs.charClass.value === "Mage") {
        specOptions = Mage.specs;
     }
     if (formState.inputs.charClass.value === "Paladin") {
        specOptions = Paladin.specs;
     }
     if (formState.inputs.charClass.value === "Priest") {
        specOptions = Priest.specs;
     }
     if (formState.inputs.charClass.value === "Rogue") {
        specOptions = Rogue.specs;
     }
    if(formState.inputs.charClass.value ==="Shaman"){
        specOptions = Shaman.specs;
    }
    if(formState.inputs.charClass.value === "Warlock"){
        specOptions = Warlock.specs;
    }
     if (formState.inputs.charClass.value === "Warrior") {
        specOptions = Warrior.specs;
     }
        

    const charSubmitHandler = async event =>{
        event.preventDefault();
        try{
            await sendRequest(process.env.REACT_APP_BACKEND_URL + "/chars",
            'POST',
            JSON.stringify({
                name: formState.inputs.name.value,
                charClass: formState.inputs.charClass.value,
                spec: formState.inputs.spec.value,
                firstProfession: formState.inputs.firstProfession.value,
                secondProfession: formState.inputs.secondProfession.value
            }),
            {'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token}
            );
            history.push("/");
        }catch(err){
        }
    };




    return(
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="char-form-container">
            <h2 className="starter-h2">New Char</h2>
            <Card>
                <h2>New Character</h2>
                <hr className="mts-hr" />
                <form className="char-form" onSubmit={charSubmitHandler}>
                <div className="form-input-container">
                <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(12)]}
                        errorText="Please enter a valid Character Name."
                        onInput={inputHandler}
                        />
                </div>
                <div className="form-selections-container">
                <Select
                    id="charClass"
                    label="Class"
                    errorText="Please enter a valid Class."
                    options={classes}
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                    onInput={inputHandler}
                   />
                 {specOptions.length > 0 && <Select
                    id="spec"
                    label="Spec"
                    errorText="Please enter a valid Spec."
                    onInput={inputHandler}
                    options={specOptions}
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                   />}
                    <Select
                    id="firstProfession"
                    label="1. Profession"
                    errorText="Please enter a valid Profession."
                    options={professions}
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                    onInput={inputHandler}
                   />
                    <Select
                    id="secondProfession"
                    label="2. Profession"
                    errorText="Please enter a valid Profession."
                    onChange={inputHandler}
                    options={professions}
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                    onInput={inputHandler}
                   />
                    


                </div>


                    <Button type="submit" disabled={!formState.isValid}>
                        ADD CHAR
                    </Button>
                </form>
            </Card>
        </div>
    </React.Fragment>
    )
}

export default NewChar;