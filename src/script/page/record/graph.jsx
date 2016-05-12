const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const graphReducer = require('../../reducer/record/graph');

const Graph = require('../../component/record/graph.jsx');

class GraphPage extends React.Component {
  constructor() {
    super();

    this.state = graphReducer(RecordModel.get('items'));
  }

  render() {
    const { route, } = this.props;
    const {
      data,
      backgroundColor,
      labels,
    } = this.state;

    if (data.length === 0) {
      return (
        <div className={`view-${route.path}`}>
          <div className="graph-cover">
            <p className="wrap">まだデータが<span className="ft-ika">トウロク</span>されてないぞ！</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`view-${route.path}`}>
        <Link to="record/list">リストでみる</Link>
        <Graph {...{ data, backgroundColor, labels, }} />
      </div>
    );
  }
}

module.exports = GraphPage;
