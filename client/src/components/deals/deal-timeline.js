import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import timeline from 'highcharts/modules/timeline'
import { useEffect } from 'react';
import { Timeline, TimelineEvent } from "react-event-timeline";
import { ArrowLeftCircleFill, ArrowRightCircleFill, XCircleFill, CheckCircleFill, EggFill } from 'react-bootstrap-icons';
import _ from 'lodash';
import moment from 'moment';


const DealTimeline = ( {stageHistory} ) => {
  const dealStages = ["Initiated", "Qualified", "Contract Sent", "Closed Won", "Closed Lost"];

  const history = stageHistory.map((stage, index, stageHistory)=>{
    let currentStageIndex = dealStages.indexOf(stage.newValue)
    let lastStageIndex = index === 0 ? -1 : dealStages.indexOf(stageHistory[index-1].newValue);
    if(lastStageIndex > currentStageIndex){
        stage.movedBackward = true
    }
    return stage
  })

  _.reverse(history);

  const renderIcon = (stage) => {
    switch (stage) {
      case 'Initiated':
        return <EggFill/>
      case 'Closed Won':
        return <CheckCircleFill/>
      case 'Closed Lost':
        return <XCircleFill/>
      default:
        return <ArrowRightCircleFill/>
    }
  }

  if (_.isEmpty(stageHistory)){
      return (
          <h1>No history to display</h1>
      )
  }

    
  return (
    <Timeline>
      {history.map(changeEntry => {
          return (
            <TimelineEvent
            title={changeEntry.newValue}
            createdAt={moment(changeEntry.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}
            icon={changeEntry.movedBackward ? <h1><ArrowLeftCircleFill/></h1>: <h1>{renderIcon(changeEntry.newValue)}</h1>}
            bubbleStyle={{"borderColor": "#fff", "backgroundColor": "#fff"}}
            >
            {`${changeEntry.user} updated deal status to ${changeEntry.newValue}`}
            </TimelineEvent>
          )
      })}
    </Timeline>
    )
  }
export default DealTimeline;