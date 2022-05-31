import React, { Component } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

class FeedbackView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFbPointIndex: null,
      feedbackObj: {
        file_name: '',
        feedback_points: [
          {
            fp_id: null,
            x_cord: 460,
            y_cord: 60,
            status: 0,
          },
          {
            fp_id: null,
            x_cord: 20,
            y_cord: 10,
            status: 1,
          },
          {
            fp_id: null,
            x_cord: 100,
            y_cord: 280,
            status: 0,
          },
          {
            fp_id: null,
            x_cord: 200,
            y_cord: 10,
            status: 0,
          },
        ],
      },
    };
    this.fnSelectFeedbackPoint = this.fnSelectFeedbackPoint.bind(this);
    this.fnCreateFeedbackPoint = this.fnCreateFeedbackPoint.bind(this);
  }

  fnCreateFeedbackPoint(e) {
    console.log('e in fnCreateFeedbackPoint', e);

    let feedbackObjBkp = this.state.feedbackObj;
    feedbackObjBkp.feedback_points.push({
      fp_id: null,
      x_cord: e.view.screenLeft,
      y_cord: e.view.screenTop,
      status: 0,
    });

    this.setState({
      feedbackObj: feedbackObjBkp,
    });
  }

  fnSelectFeedbackPoint(e, fbpIndex) {
    this.setState({
      activeFbPointIndex: fbpIndex,
    });
    this.op.toggle(e);
  }

  render() {
    return (
      <>
        <div className="memorandum-image">
          <img
            onClick={(e) => this.fnCreateFeedbackPoint(e)}
            src={process.env.PUBLIC_URL + this.props.memorandumObj.image}
            alt=""
          />
          {this.state.feedbackObj.feedback_points.map(
            (fbPointObj, fbpIndex) => {
              return (
                <div key={`fbpObj-${fbpIndex}`}>
                  <div
                    onClick={(e) => this.fnSelectFeedbackPoint(e, fbpIndex)}
                    aria-haspopup
                    aria-controls="overlay_panel"
                    className={`invision-dot ${
                      fbPointObj.status === 0 ? 'pending' : 'complete'
                    }`}
                    style={{ left: fbPointObj.x_cord, top: fbPointObj.y_cord }}
                  >
                    <span>{fbpIndex + 1}</span>
                    {/* <span><i className="fas fa-info" ></i></span> */}
                  </div>
                </div>
              );
            }
          )}
          <OverlayPanel
            ref={(el) => (this.op = el)}
            showCloseIcon
            id="overlay_panel"
            style={{ width: '450px' }}
            className="overlaypanel-demo"
          >
            {!!this.state.feedbackObj.feedback_points[
              this.state.activeFbPointIndex
            ] ? (
              <>
                x-code:{' '}
                {
                  this.state.feedbackObj.feedback_points[
                    this.state.activeFbPointIndex
                  ].x_cord
                }{' '}
                <br />
                y-code:{' '}
                {
                  this.state.feedbackObj.feedback_points[
                    this.state.activeFbPointIndex
                  ].y_cord
                }
              </>
            ) : null}
          </OverlayPanel>
        </div>
      </>
    );
  }
}

export default FeedbackView;
