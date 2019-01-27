export default {
  name: "总部门",
  user: [
    {
      name: "Prometheus",
      sex: "male"
    },
    {
      name: "Athena",
      sex: "female"
    },

    {
      name: "Stone",
      sex: "female"
    },
  ],
  group: [
    {
      name: "子部门A",
      user: [
        {
          name: "Dijkstra",
          sex: "male"
        }, {
          name: "Linus",
          sex: "male"
        }
      ],
      group: [
        {
          name: "子部门A1",
          user: [
            {
              name: 'xiaohong',
              sex: "female"
            },

            {
              name: 'xiaoming',
              sex: "male"
            }
          ],
          group: []
        }
      ]
    },
    {
      name: "子部门B",
      user: [
        {
          name: 'xiaohua',
          sex: "male"
        },
        {
          name: 'xiaofang',
          sex: "male"
        }
      ],
      group: []
    }
  ]
};
