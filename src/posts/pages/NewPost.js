import React ,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
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
import './NewPost.css';
import Card from '../../shared/components/UIElements/Card';


const NewPost = () =>{
    const auth = useContext(AuthContext);
    const {isLoading, sendRequest, error, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            title:{
                value:"",
                isValid:false
            },
            content:{
                value:"",
                isValid:false
            }
        },false
    );

    const history = useHistory();
    const postSubmitHandler = async event =>{
        event.preventDefault();
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/posts`,
            'POST',
            JSON.stringify({
                title: formState.inputs.title.value,
                content: formState.inputs.content.value,
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
        <div className="post-form-container">
           <h2 className="starter-h2">Keep in touch</h2> 
            <Card>
            <h2 > New Post </h2>
            <hr className="mts-hr"/>
                <form className="post-form" onSubmit={postSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Add a new title"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(55)]}
                        errorText="Please enter some content."
                        onInput={inputHandler}
                    />
                    <Input
                        id="content"
                        element="textarea"
                        type="text"
                        label="Add a new Post"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(140),VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter some content."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        ADD POST
                    </Button>
                </form>
            </Card>
        </div>
        </React.Fragment>  
    )
}

export default NewPost;