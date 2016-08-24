Vagrant.configure(2) do |config|
  
  config.vm.box = "phusion/ubuntu-14.04-amd64"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.synced_folder ".", "/code/docktor"
end
