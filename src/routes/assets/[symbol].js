import yahooFinance from 'yahoo-finance2'

/**
 * 
 * @param {Object} request Request Object
 * @param {Object} request.params Params parsed out of request
 * @param {string} request.params.symbol The symbol to get chart data for
 */
export async function get({ params }) {

  /* TODO: Auth */

  console.log(`getting chart data for ${params.symbol}`)

  const query = params.symbol
  const queryOptions = { period1: '2020-01-01' }
  const res = await yahooFinance._chart(query, queryOptions)


  return {
    status: 200,
    headers: {
      'access-control-allow-origin': '*'
    },
    body: {
      chartData: res
    }
  };
}
