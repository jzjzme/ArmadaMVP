//asset.cpp

#include <eosio.hpp>

struct asset{
	int product_id;
	asset_name asset_id;
	int checkpoint_id;
	account_name owner;
};

struct asset_record{

	account_name oracle;
	asset_name asset_id;
	uint64_t check_ins = 0;
	uint32_t arrived = 0;

	asset_record(uint32_t c = now() ):created(c){}
	static Name table_id(){ return Name("asset");}
};


void register_asset(){

	const auto& asset = current_action<asset>();
	require_auth(asset.owner);

	eosio_assert( current_context() == asset.owner, "cannot call from other context");

	static asset_record& existing;

	if( !Db::get(asset.assetid, existing))
		Db::store(asset.assetid, post_record( now()));
}

void check_in_asset(){

	const auto& check = current_action<asset_record>();
	require_recipient(check.oracle, check.asset_id);

	auto context = current_context();
	auto oracle = check.getOracle();

	if( context == check.oracle){
		static asset_record record;
		eosio_assert( Db::get(check.assetid, record) >0, "unable to find record");
		record.check_ins += 1;
		Db::store(check.asset_id, record);
	}
	else{
		eosio_assert(false, "invalid context for check in");
	}
}

void receive_asset(){

	const auto& check = current_action<asset_record>();
	require_recipient(check.oracle, check.assetid);

	auto context = current_context();
	auto oracle = check.getOracle();

	if( context == check.oracle){
		static asset_record record;
		eosio_assert( Db::get(check.assetid, record) >0, "unable to find record");
		record.arrived = 1;
		Db::store(check.asset_id, record);
	}
	else{
		eosio_assert(false, "invalid context for check in");
	}

}

void query_asset(){
//not sure how to query the info yet.

}


