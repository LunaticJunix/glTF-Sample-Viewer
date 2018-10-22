// contain:
// transform
// primitives & materials
// child indices (reference to scene array of nodes)

class gltfNode
{
    // TODO: children, primitives

    //  vec3 translation, quat rotation, vec3 scale
    constructor(translation = jsToGl([0, 0, 0]),
                rotation = jsToGl([0, 0, 0, 1]),
                scale = jsToGl([1, 1, 1]),
                children = [],
                name = undefined)
    {
        this.translation = translation;
        this.rotation = rotation;
        this.scale = scale;
        this.children = children;
        this.camera = undefined;
        this.name = name;
    }

    fromJson(jsonNode)
    {
        if (jsonNode.name !== undefined)
        {
            this.name = jsonNode.name;
        }

        if (jsonNode.children !== undefined)
        {
            this.children = jsonNode.children;
        }

        this.mesh = jsonNode.mesh;
        this.camera = jsonNode.camera;

        if (jsonNode.matrix !== undefined)
        {
            this.decomposeMatrix(jsonNode.matrix);
        }
        else
        {
            if (jsonNode.scale !== undefined)
            {
                this.scale = jsToGl(jsonNode.scale);
            }

            if (jsonNode.rotation !== undefined)
            {
                this.rotation = jsToGl(jsonNode.rotation);
            }

            if (jsonNode.translation !== undefined)
            {
                this.translation = jsToGl(jsonNode.translation);
            }
        }
    }

    decomposeMatrix(matrixData)
    {
        let matrix = jsToGl(matrixData);
        mat4.getScaling(this.scale, matrix);
        mat4.getRotation(this.rotation, matrix);
        mat4.getTranslation(this.translation, matrix);
    }

    // vec3
    translate(translation)
    {
        this.translation = translation;
    }

    // quat
    rotate(rotation)
    {
        this.rotation = rotation;
    }

    // vec3
    scale(scale)
    {
        this.scale = scale;
    }

    // TODO: WEIGHTS

    getTransform()
    {
        var transform = mat4.create();

        mat4.fromRotationTranslationScale(transform, this.rotation, this.translation, this.scale);

        return transform;
    }
};
