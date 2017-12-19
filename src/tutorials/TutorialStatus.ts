// TODO 2017.12.19 | rename. confusing with TutorialState

import TutorialState from "./TutorialState";


interface TutorialStatusValues
{
  introTutorial: TutorialState;
}

const defaultTutorialStatus =
{
  introTutorial: TutorialState.Show,
};

class TutorialStatus implements TutorialStatusValues
{
  introTutorial: TutorialState;

  constructor()
  {
    this.setDefaultValues();
  }
  private setDefaultValues()
  {
    this.introTutorial = defaultTutorialStatus.introTutorial;
  }
  private setDefaultValuesForUndefined()
  {
    this.introTutorial = isFinite(this.introTutorial) ? this.introTutorial : defaultTutorialStatus.introTutorial;
  }
  public save()
  {
    localStorage.setItem("Rance.TutorialStatus", JSON.stringify(this.serialize()));
  }
  public load()
  {
    this.setDefaultValues();

    const tutorialStatusData = localStorage.getItem("Rance.TutorialStatus");

    if (!tutorialStatusData)
    {
      return;
    }

    const parsedData: TutorialStatusValues = JSON.parse(tutorialStatusData);
    this.deSerialize(parsedData);
  }
  public reset()
  {
    localStorage.removeItem("Rance.TutorialStatus");
    this.setDefaultValues();
  }

  private serialize(): TutorialStatusValues
  {
    return(
    {
      introTutorial: this.introTutorial,
    });
  }
  private static getDeSerializedState(state: TutorialState)
  {
    return state === TutorialState.DontShowThisSession ? TutorialState.Show : state;
  }
  private deSerialize(data: TutorialStatusValues)
  {
    this.introTutorial = TutorialStatus.getDeSerializedState(data.introTutorial);

    this.setDefaultValuesForUndefined();
  }
}

const tutorialStatus = new TutorialStatus();
export default tutorialStatus;
