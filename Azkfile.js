systems({
  'rede-doar-api': {
    depends: ['mongodb'],
    image: {'docker': 'azukiapp/node:5.2.0'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: ['npm', 'start'],
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('./api'),
      '/azk/#{manifest.dir}/public': path('./api/public'),
      '/azk/#{manifest.dir}/tmp': path('./api/tmp'),
      '/azk/#{manifest.dir}/node_modules': persistent('./node_modules'),
    },
    scalable: {'default': 1},
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8000/tcp',
      livereload: '35729:35729/tcp'
    },
    envs: {
      NODE_ENV: 'dev',
      HOST: '0.0.0.0',
      PORT: '8000',
      DROP_DATABASE: false
    },
  },
  'mongodb': {
    image : {docker: 'azukiapp/mongodb'},
    scalable: false,
    wait: 20,
    mounts: {
      '/data/db': persistent('mongodb-#{manifest.dir}'),
    },
    ports: {
      data: '32770:27017/tcp'
    },
    http: {
      domains: ['#{manifest.dir}-#{system.name}.#{azk.default_domain}'],
    },
    export_envs: {
      MONGODB_URI: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development',
      MONGODB_URI_TEST: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_test'
    },
  },
  admin: {
    depends: [],
    image: {'docker': 'azukiapp/node'},
    provision: [
      'npm install',
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: ['npm', 'start'],
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('./admin'),
      '/azk/#{manifest.dir}/node_modules': persistent('./node_modules'),
    },
    scalable: {'default': 1},
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8000:8000/tcp'
    },
    envs: {
      NODE_ENV: 'dev',
      PORT: '8000',
    },
  }
});

setDefault('rede-doar-api');
