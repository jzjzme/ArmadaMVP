
#include <utility>
#include <vector>
#include <string>
#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/contract.hpp>
#include <eosiolib/crypto.h>

using eosio::key256;
using eosio::indexed_by;
using eosio::const_mem_fun;
using eosio::asset;
using eosio::permission_level;
using eosio::action;
using eosio::print;
using eosio::name;


class asset : public eosio::contract {
	public:


	void register_asset(const asset& asset, const account_name owner){
		require_auth(owner);

		auto cur_owner = accounts.find( owner );
		eosio_assert(cur_owner != accounts.end(), "unknown account");

		auto new_asset = assets.emplace(_self, [&](auto& asset){
			asset.id = asset.available_primary_key();
			asset.checkin = check_in;
			asset.owner  = owner;
			asset.product = product_id;
			asset.checkpoint = oracle;
		});

	}


	void check_in_asset(){

		

	}

	void receive_asset(){

	}

	void query_asset(){

	}

}