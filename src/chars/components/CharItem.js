import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import edit from "../../assets/svg/edit.svg";
import deleteIcon from "../../assets/svg/delete.svg";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import professions from "../../assets/data-assets/professions";
import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./CharItem.css";

const CharItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/chars/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (error) {}
  };

  const iconIndex = professions.find(profession => profession.name === props.mProf);
  const icon2Index = professions.find(profession => profession.name === props.sProf);
  let prof1Icon;
  prof1Icon = iconIndex.icon;
  let prof2Icon;
  prof2Icon = icon2Index.icon;

  let lowClass;
  lowClass = props.charClass.toLowerCase();

  let specIcon;
  if (props.spec === "Balance") {
    specIcon = "spell_nature_starfall";
  }
  if (props.spec === "Feral") {
    specIcon = "ability_druid_catform";
  }
  if (props.spec === "Bear") {
    specIcon = "ability_racial_bearform";
  }
  if (props.charClass === "Druid" && props.spec === "Resto") {
    specIcon = "spell_nature_healingtouch";
  }
  if (props.spec === "BM") {
    specIcon = "ability_hunter_bestialdiscipline";
  }
  if (props.spec === "Marksman") {
    specIcon = "ability_hunter_focusedaim";
  }
  if (props.spec === "Survival") {
    specIcon = "ability_hunter_camouflage";
  }
  if (props.spec === "Arcane") {
    specIcon = "spell_holy_magicalsentry";
  }
  if (props.spec === "Fire") {
    specIcon = "spell_fire_firebolt02";
  }
  if (props.spec === "Frost") {
    specIcon = "spell_frost_frostbolt02";
  }
  if (props.charClass === "Paladin" && props.spec === "Holy") {
    specIcon = "spell_holy_holybolt";
  }
  if (props.charClass === "Paladin" && props.spec === "Prot") {
    specIcon = "ability_paladin_shieldofthetemplar";
  }
  if (props.spec === "Retri") {
    specIcon = "spell_holy_auraoflight";
  }
  if (props.spec === "Disci") {
    specIcon = "spell_holy_powerwordshield";
  }
  if (props.charClass === "Priest" && props.spec === "Holy") {
    specIcon = "spell_holy_guardianspirit";
  }
  if (props.spec === "Shadow") {
    specIcon = "spell_shadow_shadowwordpain";
  }
  if (props.spec === "Assassin") {
    specIcon = "ability_rogue_eviscerate";
  }
  if (props.charClass === "Shaman" && props.spec === "Resto") {
    specIcon = "spell_nature_magicimmunity";
  }
  if (props.spec === "Enhancer") {
    specIcon = "spell_shaman_improvedstormstrike";
  }
  if (props.spec === "Ele") {
    specIcon = "spell_nature_lightning";
  }
  if (props.spec === "Balance") {
    specIcon = "spell_nature_starfall";
  }
  if (props.spec === "Affli") {
    specIcon = "spell_shadow_deathcoil";
  }
  if (props.spec === "Demo") {
    specIcon = "spell_shadow_metamorphosis";
  }
  if (props.spec === "Destro") {
    specIcon = "spell_shadow_rainoffire";
  }
  if (props.spec === "Arms") {
    specIcon = "ability_warrior_savageblow";
  }
  if (props.spec === "Fury") {
    specIcon = "ability_warrior_innerrage";
  }
  if (props.charClass === "Warrior" && props.spec === "Prot") {
    specIcon = "ability_warrior_defensivestance";
  }



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="char-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this char? Please note that it can't
          be undone thereafter.
        </p>
      </Modal>

      <li id={props.id} className="char-item">
        <Card className="char-item-card">
          <div className="char-item__char-info">
            <div>
              <h2>{props.charName}</h2>
            </div>
            <hr className="mts-hr--inverse" />
          
            <div>
            <img
                className="class-icon"
                alt="class"
                src={`https://render-classic-us.worldofwarcraft.com/icons/56/classicon_${lowClass}.jpg`}
              />
              <img
                className="spec-icon"
                alt="spec"
                src={`https://render-classic-us.worldofwarcraft.com/icons/56/${specIcon}.jpg`}
              /><div>
              <p className="inner-p">{props.spec}</p>
              <p className="inner-p">{props.charClass}</p>
              </div>
              <Button
                className="button--small button--inverse button--char-edit"
                to={"/"}
              >
                <img src={edit} alt="edit" width="14px" />
              </Button>
            </div>
            <hr className="mts-hr--inverse" />
            <div>            <h2>Professions</h2>
</div>

            <div>

          <img
                className="profession-icon"
                alt="spec"
                src={`https://render-classic-us.worldofwarcraft.com/icons/56/${prof1Icon}.jpg`}
              />
              <p>{props.mProf}</p>
              </div>
              <div>
              <img
                className="profession-icon"
                alt="spec"
                src={`https://render-classic-us.worldofwarcraft.com/icons/56/${prof2Icon}.jpg`}
              />
              <p>{props.sProf}</p>
              <Button
                className="button--small button--inverse button--char-edit"
                to={"/"}
              >
                <img src={edit} alt="edit" width="14px" />
              </Button>
          </div>
          </div>
         
              
          <div className="char-item__img">
            <Button danger onClick={showDeleteWarningHandler}>
              <img src={deleteIcon} alt="delete" width="14px" />
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CharItem;
