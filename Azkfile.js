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
    wait: 50,
    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
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
      PORT: '8000'
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
      http: '28017:28017/tcp',
    },
    http: {
      domains: [ '#{manifest.dir}-#{system.name}.#{azk.default_domain}' ],
    },
    export_envs: {
      MONGODB_URI: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development',
    },
  }
});

setDefault('rede-doar-api');
