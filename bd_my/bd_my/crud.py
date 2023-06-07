import json
from datetime import datetime, timedelta

from sqlalchemy import text


async def crud_get_types_of_insurance(db, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM types_of_insurance WHERE id = :id_obj ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj})
    else:
        query = text("SELECT * From types_of_insurance")
        result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def crud_get_objects_of_insurance(db, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM objects_of_insurance WHERE id = :id_obj ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj})
    else:
        query = text("SELECT * From objects_of_insurance")
        result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def crud_get_people_types(db, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM types_people WHERE id = :id_obj ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj})
    else:
        query = text("SELECT * From types_people")
        result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def crud_get_peoples_db(db, type_people_id, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM peoples_db WHERE id = :id_obj and type_people_id = :type_people_id ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj, "type_people_id": type_people_id})
    else:
        query = text("SELECT * From peoples_db WHERE type_people_id = :type_people_id")
        result = await db.execute(query, {"type_people_id": type_people_id})
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def crud_get_insurance_activity(db, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM insurance_activity WHERE id = :id_obj ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj})
    else:
        query = text("SELECT * From insurance_activity")
        result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def crud_get_payments_under_the_contract(db, id_obj=None):
    if id_obj:
        query = text("SELECT * FROM payments_under_the_contract WHERE id = :id_obj ORDER BY id")
        result = await db.execute(query, {"id_obj": id_obj})
    else:
        query = text("SELECT * From payments_under_the_contract")
        result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)
    # return await payments_and_received(db=db, data=data)


async def crud_transform_json(result):
    rows = result.fetchall()
    columns = result.keys()
    rows_dict = []
    for row in rows:
        row_dict = dict(zip(columns, row))
        for key, value in row_dict.items():
            if value:
                if 'date' == key:
                    row_dict[key] = value.isoformat()
            else:
                row_dict[key] = 'Информация отсутствует'
        rows_dict.append(row_dict)
    return json.loads(json.dumps(rows_dict))


async def crud_post_types_of_insurance(data: dict, db):
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = f"insert into types_of_insurance ({fields}) values ({placeholders})"
    query_text = text(query_text)
    await db.execute(query_text, data)
    await db.commit()


async def crud_post_objects_of_insurance(data: dict, db):
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = text(f"INSERT INTO objects_of_insurance ({fields}) VALUES ({placeholders})")
    await db.execute(query_text, data)
    await db.commit()


async def crud_post_people_types(data: dict, db):
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = text(f"INSERT INTO people_types ({fields}) VALUES ({placeholders})")
    await db.execute(query_text, data)
    await db.commit()


async def crud_post_peoples_db(data: dict, db, type_people_id):
    data["type_people_id"] = type_people_id
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = text(f"INSERT INTO peoples_db ({fields}) VALUES ({placeholders})")
    await db.execute(query_text, data)
    await db.commit()


async def crud_post_insurance_activity(data: dict, db):
    for key, value in data.items():
        if key == 'date':
            data[key] = datetime.strptime(value, '%Y-%m-%d').date()
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = text(f"INSERT INTO insurance_activity ({fields}) VALUES ({placeholders})")
    await db.execute(query_text, data)
    await db.commit()


async def crud_post_payments_under_the_contract(data: dict, db):
    data['payments'] = 0
    data['received'] = 0
    fields = ','.join(data.keys())
    placeholders = ','.join(f':{key}' for key in data.keys())
    query_text = text(f"INSERT INTO payments_under_the_contract ({fields}) VALUES ({placeholders})")
    await db.execute(query_text, data)
    await db.commit()


async def crud_update_types_of_insurance(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE types_of_insurance SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_objects_of_insurance(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE objects_of_insurance SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_people_types(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE people_types SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_peoples_db(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE peoples_db SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_deal_types(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE deal_types SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_insurance_activity(data: dict, id_obj, db):
    for key, value in data.items():
        if key == 'date':
            data[key] = datetime.strptime(value, '%Y-%m-%d').date()
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE insurance_activity SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_update_payments_under_the_contract(data: dict, id_obj, db):
    set_clause = ', '.join([f"{key} = :{key}" for key in data.keys()])
    query_text = f"UPDATE payments_under_the_contract SET {set_clause} WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj, **data)
    await db.execute(query)
    await db.commit()


async def crud_delete_object_types(id_obj, db):
    query_text = "DELETE FROM object_types WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_types_of_insurance(id_obj, db):
    query_text = "DELETE FROM types_of_insurance WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_objects_of_insurance(id_obj, db):
    query_text = "DELETE FROM objects_of_insurance WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_people_types(id_obj, db):
    query_text = "DELETE FROM people_types WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_peoples_db(id_obj, db):
    query_text = "DELETE FROM peoples_db WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_insurance_activity(id_obj, db):
    query_text = "DELETE FROM insurance_activity WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_delete_payments_under_the_contract(id_obj, db):
    query_text = "DELETE FROM payments_under_the_contract WHERE id=:id_obj"
    query = text(query_text).bindparams(id_obj=id_obj)
    await db.execute(query)
    await db.commit()


async def crud_get_all_types_columns():
    return ['integer', 'varchar', 'boolean', "float", "date", "timestamp"]


async def crud_add_columns(table_name, column_name, data_type, db):
    query = text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {data_type}")
    await db.execute(query)
    await db.commit()


async def crud_delete_columns(table_name, column_name, db):
    query = text(f"ALTER TABLE {table_name} DROP COLUMN {column_name}")
    await db.execute(query)
    await db.commit()


async def select_all_peoples_db_life(db):
    type_of_insurance = "Жизнь"
    one_month_ago = datetime.today() - timedelta(days=30)
    query = text("""
        SELECT pd.*
        FROM peoples_db pd
        JOIN insurance_activity ia ON pd.id = ia.client_id
        JOIN objects_of_insurance oi ON ia.objects_of_insurance_id = oi.id
        JOIN types_of_insurance ti ON oi.type_of_insurance_id = ti.id
        WHERE ti.type_of_insurance = :type_of_insurance
        AND ia.date >= :one_month_ago
        ORDER BY pd.id;
    """)
    result = await db.execute(query, {"one_month_ago": one_month_ago, "type_of_insurance": type_of_insurance})
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def select_received_for_clients(db):
    query = text("""
        SELECT peoples_db.id, peoples_db.name, peoples_db.surname, SUM(payments_under_the_contract.payments),
        SUM(payments_under_the_contract.received)
        FROM peoples_db
        JOIN insurance_activity ON peoples_db.id = insurance_activity.client_id
        JOIN payments_under_the_contract ON
        insurance_activity.id = payments_under_the_contract.insurance_activity_id
        GROUP BY peoples_db.id
        ORDER BY peoples_db.id;
        """)
    result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def select_objects_sum(db, insurance_sum):
    query = text("""
        SELECT objects_of_insurance.*
        FROM objects_of_insurance
        JOIN insurance_activity ON insurance_activity.objects_of_insurance_id = objects_of_insurance.id
        WHERE insurance_activity.summ_activity > :insurance_sum
        ORDER BY objects_of_insurance.id;
    """)
    result = await db.execute(query, {"insurance_sum": insurance_sum})
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def select_dynamic_imprisonment(db):
    query = text("""
        SELECT types_of_insurance.type_of_insurance, COUNT(insurance_activity.id) AS contracts_count, 
        TO_CHAR(insurance_activity.date, 'YYYY-MM') AS year_month
        FROM insurance_activity
        JOIN objects_of_insurance ON 
        insurance_activity.objects_of_insurance_id = objects_of_insurance.id
        JOIN types_of_insurance ON 
        objects_of_insurance.type_of_insurance_id = types_of_insurance.id
        GROUP BY types_of_insurance.type_of_insurance, year_month
        ORDER BY year_month, types_of_insurance.type_of_insurance;
        """)
    result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def select_all_clients_and_agents(db):
    query = text("""
        SELECT peoples_db.*
        FROM peoples_db
        JOIN types_people ON peoples_db.type_people_id = types_people.id
        WHERE types_people.type_people IN ('Клиент', 'Агент')
        ORDER BY peoples_db.type_people_id, peoples_db.id;
        """)
    result = await db.execute(query)
    return await data_check(result=await crud_transform_json(result=result), db=db)


async def data_check(db, result):
    for count, i in enumerate(result):
        for _ in i:
            if _ == 'type_of_insurance_id':
                result[count]['type_of_insurance_id'] = await crud_get_types_of_insurance(
                    id_obj=result[count]['type_of_insurance_id'], db=db)
            elif _ == 'objects_of_insurance_id':
                result[count]['objects_of_insurance_id'] = await crud_get_objects_of_insurance(
                    id_obj=result[count]['objects_of_insurance_id'], db=db)
            elif _ == 'type_people_id':
                result[count]['type_people_id'] = await crud_get_people_types(id_obj=result[count]['type_people_id'],
                                                                              db=db)
            elif _ == 'client_id':
                result[count]['client_id'] = await crud_get_peoples_db(id_obj=result[count]['client_id'], db=db,
                                                                       type_people_id=1)
            elif _ == 'agent_id':
                result[count]['agent_id'] = await crud_get_peoples_db(id_obj=result[count]['agent_id'], db=db,
                                                                      type_people_id=2)
            elif _ == 'insurance_activity_id':
                result[count]['insurance_activity_id'] = await crud_get_insurance_activity(
                    id_obj=result[count]['insurance_activity_id'], db=db)
    return result


async def payments_and_received(db, data):
    insurance_activity_data = await crud_get_insurance_activity(id_obj=data['insurance_activity_id'], db=db)
    a = insurance_activity_data['date'] - datetime.now()
    return


async def check_value(data):
    for key, value in data.items():
        if value == 'Информация отсутствует':
            data[key] = None
        if '_id' in key and type(value) == str:
            data.pop(key, None)
    return data
