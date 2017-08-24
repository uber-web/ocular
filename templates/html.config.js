module.exports = res => `module.exports = {

  title: '${res.name}',

  meta: [{
    name: 'description',
    content: '${res.desc}',
  }],

};
`;
