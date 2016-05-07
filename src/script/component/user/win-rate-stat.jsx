const React = require('react'); // eslint-disable-line no-unused-vars

const WinRateStat = ({
  winRateDetail,
}) => {
  return (
    <div>
      {winRateDetail.map((rule, idx) => {
        return (
          <div key={idx}>
            <h3 className="ft-ika">{rule.name}のショウリツ</h3>
            <table className="user-stat wrap fs-s">
              <tbody>
                <tr>
                  <td>{rule.name}合計</td>
                  <td className="slim">{rule.total}%</td>
                  <td className="slim">{rule.count}戦</td>
                </tr>
                {rule.detail.map((stage, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="fs-s">{stage.name}</td>
                      <td className="slim">{stage.winRate}%</td>
                      <td className="slim">{stage.count}戦</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

module.exports = WinRateStat;
