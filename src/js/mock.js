import Loading from "@/components/others/Loading/loading";

const Chance = require('chance');
const chance = new Chance();

/**
 * 将数据使用Promise延时返回
 * @param dataGeneFn 数据生成函数
 * @param timeOut 延时
 * @returns {function(): Promise<unknown>}
 */
function mockAjax(dataGeneFn, timeOut = 500) {
  return function () {
    return new Promise((resolve) => {
      // 模拟网络请求
      const loading = new Loading()
      setTimeout(() => {
        loading.remove()
        resolve(dataGeneFn())
      }, timeOut)
    })
  }
}

function geneTableData() {
  const total = chance.integer({ min: 100, max: 200 })
  const data = []

  for(let i = 0; i < 10; i++) {
    data.push({
      id: chance.bb_pin(),
      name: chance.name(),
      age: chance.integer({ min: 22, max: 35 }),
      sex: chance.gender().toLowerCase(),
      email: chance.email(),
      job: {
        jobName: chance.profession(),
        expectedSalary: chance.natural({ min: 6000, max: 20000 })
      }
    })
  }

  return { total, data }
}

export const getTableData = mockAjax(geneTableData)
